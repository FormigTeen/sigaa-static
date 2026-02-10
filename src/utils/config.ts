export const getProjectUrl = () => import.meta.env.PUBLIC_BASE_URL || "http://localhost:3000"

export const getSourceUrl = () =>
  import.meta.env.PUBLIC_SOURCE_URL ||
  "https://gist.githubusercontent.com/FormigTeen/725369126b9bf2bdc051e583cc169c6e/raw/76f804913aaaaf56d9828bfa40ce975bc6d2cb7e/ufba.json"
