import { useState } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, Users, PenSquareIcon, Trash2Icon, PlusIcon, Check, X, LoaderIcon } from "lucide-react"
import { toast } from "react-hot-toast"
import api from "../lib/axios"
import useRoles from "../hooks/useRoles"

const SettingsPage = () => {
  const { roles, setRoles, loading } = useRoles()
  const [editingIndex, setEditingIndex] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [newRole, setNewRole] = useState("")
  const [saving, setSaving] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null) // { roleName, count }

  const handleStartEdit = (index) => {
    setEditingIndex(index)
    setEditValue(roles[index])
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditValue("")
  }

  const handleRename = async () => {
    const oldName = roles[editingIndex]
    const newName = editValue.trim()

    if (!newName) {
      toast.error("Role name cannot be empty")
      return
    }

    if (newName === oldName) {
      handleCancelEdit()
      return
    }

    if (roles.some((r, i) => i !== editingIndex && r.toLowerCase() === newName.toLowerCase())) {
      toast.error("A role with that name already exists")
      return
    }

    if (newName.length > 50) {
      toast.error("Role name must be 50 characters or fewer")
      return
    }

    setSaving(true)
    try {
      const res = await api.patch("/settings/roles/rename", { oldName, newName })
      setRoles(res.data.settings.roles)
      const count = res.data.membersUpdated
      if (count > 0) {
        toast.success(`Role renamed. ${count} member${count !== 1 ? "s" : ""} updated.`)
      } else {
        toast.success("Role renamed")
      }
      handleCancelEdit()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to rename role")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = async (roleName) => {
    try {
      const res = await api.get(`/settings/roles/count?roleName=${encodeURIComponent(roleName)}`)
      setDeleteModal({ roleName, count: res.data.count })
    } catch (error) {
      toast.error("Failed to check role usage")
    }
  }

  const handleConfirmDelete = async () => {
    const { roleName } = deleteModal
    setSaving(true)
    try {
      const res = await api.delete("/settings/roles", { data: { roleName } })
      setRoles(res.data.settings.roles)
      toast.success("Role deleted")
      setDeleteModal(null)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete role")
    } finally {
      setSaving(false)
    }
  }

  const handleAddRole = async () => {
    const name = newRole.trim()

    if (!name) {
      toast.error("Role name cannot be empty")
      return
    }

    if (name.length > 50) {
      toast.error("Role name must be 50 characters or fewer")
      return
    }

    if (roles.some(r => r.toLowerCase() === name.toLowerCase())) {
      toast.error("A role with that name already exists")
      return
    }

    if (roles.length >= 10) {
      toast.error("Maximum of 10 roles allowed")
      return
    }

    setSaving(true)
    try {
      const updatedRoles = [...roles, name]
      const res = await api.put("/settings/roles", { roles: updatedRoles })
      setRoles(res.data.roles)
      setNewRole("")
      toast.success("Role added")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add role")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-4xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Members
          </Link>

          <h1 className="text-2xl font-bold px-4 py-4">Settings</h1>

          {/* Roles Section */}
          <div className="card bg-base-100 mb-6">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Users className="size-6 text-primary" />
                <h2 className="card-title">Roles</h2>
              </div>
              <p className="text-base-content/70 mb-4">
                Manage the available roles that can be assigned to members.
              </p>
              <div className="divider my-2"></div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <LoaderIcon className="animate-spin size-6" />
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Role list */}
                  {roles.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200">
                      {editingIndex === index ? (
                        <>
                          <input
                            type="text"
                            className="input input-bordered input-sm flex-1"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRename()
                              if (e.key === "Escape") handleCancelEdit()
                            }}
                            autoFocus
                            disabled={saving}
                          />
                          <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={handleRename}
                            disabled={saving}
                          >
                            <Check className="size-4 text-success" />
                          </button>
                          <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={handleCancelEdit}
                            disabled={saving}
                          >
                            <X className="size-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 px-2">{role}</span>
                          <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => handleStartEdit(index)}
                            disabled={saving}
                          >
                            <PenSquareIcon className="size-4" />
                          </button>
                          <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => handleDeleteClick(role)}
                            disabled={saving || roles.length <= 1}
                          >
                            <Trash2Icon className="size-4 text-error" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}

                  {/* Add role */}
                  {roles.length < 10 && (
                    <div className="flex items-center gap-2 p-2 pt-4">
                      <input
                        type="text"
                        placeholder="New role name"
                        className="input input-bordered input-sm flex-1"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddRole()
                        }}
                        disabled={saving}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handleAddRole}
                        disabled={saving || !newRole.trim()}
                      >
                        <PlusIcon className="size-4" />
                        Add
                      </button>
                    </div>
                  )}

                  {roles.length >= 10 && (
                    <p className="text-base-content/50 text-sm text-center pt-4">
                      Maximum of 10 roles reached
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Role</h3>
            <p className="py-4">
              {deleteModal.count > 0
                ? `"${deleteModal.roleName}" will be removed from ${deleteModal.count} member${deleteModal.count !== 1 ? "s" : ""}. Are you sure you want to do this?`
                : `Delete role "${deleteModal.roleName}"?`
              }
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setDeleteModal(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleConfirmDelete}
                disabled={saving}
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !saving && setDeleteModal(null)}></div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
