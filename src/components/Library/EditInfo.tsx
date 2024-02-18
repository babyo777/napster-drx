import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../ui/button";

const EditInfo: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <AiOutlineMenu className="h-7 w-7 text-zinc-400" />
      </DrawerTrigger>
      <DrawerContent className="items-center">
        <DrawerHeader>
          <DrawerTitle className="text-zinc-400 font-bold">
            Want to remove?
          </DrawerTitle>
        </DrawerHeader>

        <Button
          asChild
          disabled
          variant={"destructive"}
          className=" py-5 w-[85vw] rounded-xl bg-red-500"
        >
          <p>Coming Soon</p>
        </Button>
        <DrawerFooter className="text-center text-xs text-zinc-500">
          {id}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditInfo;
