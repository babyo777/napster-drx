import ProgressBar from "@ramonak/react-progress-bar"

export default function TransferHeader({progress,data}:{progress:number,data:}) {
  return (
    <div className="flex w-full flex-col space-y-3 items-center">
              <p className="text-zinc-300  font-semibold text-xl animate-fade-down">
                {Math.floor((progress / data.tracks.length) * 100)}%
              </p>

              <ProgressBar
                className=" w-full border-none"
                height="4px"
                isLabelVisible={false}
                bgColor="#1DD45F"
                maxCompleted={data.tracks.length}
                completed={progress || 0}
              />
              <p className="text-zinc-300  font-semibold text-lg animate-fade-up">
                Transferred {progress}/{data.tracks.length}
              </p>
            </div>
  )
}

