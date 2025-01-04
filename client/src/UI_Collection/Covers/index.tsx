
import { useAppSelector } from "../../App/hook";



export const CoverOne = () => {

      const {professionalTitle} = useAppSelector((state)=> state.website);

    return (
        <>
            <main className="p-5 h-auto bg-green-600">
                <div>
                    <h2>cover section</h2>
                    <p>{professionalTitle || "default title"}</p>
                </div>
            </main>
        </>
    )
}


export const CoverTwo = () => {

  const {professionalTitle} = useAppSelector((state)=> state.website);


  return (
    <>
          <main className="p-5 h-auto bg-sky-600">
        <div className="text-center">
          <h2>cover section</h2>
          <p>{professionalTitle || "default title"}</p>
        </div>
      </main>
    </>
  )
}

