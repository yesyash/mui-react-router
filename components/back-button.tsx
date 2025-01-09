import { Button } from "@mui/material"
import { useNavigate } from "react-router"

export const BackButton = () => {
  const navigate = useNavigate()
  return <Button onClick={() => navigate(-1)}>&larr; Back</Button>
}