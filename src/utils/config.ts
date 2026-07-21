export const getProjectUrl = () => import.meta.env.PUBLIC_BASE_URL || "http://localhost:3000"

export const getSourceUrl = () =>
  import.meta.env.PUBLIC_SOURCE_URL ||
  "https://gxhoudsfjpdlvthvbgwm.supabase.co/storage/v1/object/sign/Storage/ufba.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNjdjYmYyYi0zNDU3LTQ0OGItODg3ZS1hOTViYWM1ZDA1NDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdG9yYWdlL3VmYmEuanNvbiIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQ2NjA1MDcsImV4cCI6MTc4NzI1MjUwN30.Puo2HiZ_41B8GY-_SOouKEJrwfqdmRoXJ2aRdZJog4U"
