import { CircleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
        <CircleLoader size={80} />
    </div>
  )
}
