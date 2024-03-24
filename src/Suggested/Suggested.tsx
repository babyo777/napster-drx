import { RootState } from "@/Store/Store";
import GoBack from "@/components/Goback";
import UpNextSongs from "./upNextSongs";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback } from "react";
import { setPlaylist } from "@/Store/Player";

function Suggested() {
  const dispatch = useDispatch();
  const PlaylistOrAlbum = useSelector(
    (state: RootState) => state.musicReducer.PlaylistOrAlbum
  );

  const data = useSelector((state: RootState) => state.musicReducer.playlist);

  const handleDRagEND = useCallback(
    (event: DragEndEvent) => {
      const b = data.map((item, i) => ({
        ...item,
        id: i,
      }));

      if (b) {
        const getId = (id: UniqueIdentifier) => b.findIndex((d) => d.id === id);
        const { active, over } = event;
        if (over && active) {
          if (active.id === over.id) return;

          const or = getId(active.id);

          const newPos = getId(over.id);

          const np = arrayMove(b, or, newPos);

          dispatch(setPlaylist(np));
        }
      }
    },
    [dispatch, data]
  );

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragEnd={handleDRagEND}
    >
      <div className="flex fade-in flex-col items-center">
        <>
          <div className="flex w-full z-10 fixed h-[3rem]  ">
            <GoBack />
            <div className="absolute top-4 z-10 right-3 flex-col space-y-0.5">
              <div className="w-fit">
                <p className="fade-in mb-2 text-zinc-100  backdrop-blur-md bg-black/30 rounded-full p-1.5 px-2 w-fit">
                  Edit
                </p>
              </div>
            </div>

            <div className=" absolute bottom-5  px-4 left-0  right-0">
              <h1 className="text-center  font-semibold py-2 text-2xl capitalize"></h1>
              <div className="flex space-x-4 py-1 px-2 justify-center  items-center w-full"></div>
            </div>
          </div>
          {data && data.length > 0 && (
            <div className="py-3 pt-14 pb-[8.5rem]">
              <SortableContext
                items={data.map((it, i) => ({
                  ...it,
                  id: i,
                }))}
                strategy={verticalListSortingStrategy}
              >
                {data.map((data, i) => (
                  <UpNextSongs
                    p={"suggested"}
                    where="suggested"
                    artistId={data.artists[0]?.id}
                    audio={data.youtubeId}
                    key={data.youtubeId + i}
                    id={i}
                    album={PlaylistOrAlbum == "album" && true}
                    title={data.title}
                    artist={data.artists[0]?.name}
                    cover={data.thumbnailUrl}
                  />
                ))}
              </SortableContext>
            </div>
          )}
        </>
      </div>
    </DndContext>
  );
}

export default Suggested;
