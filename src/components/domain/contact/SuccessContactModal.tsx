import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export const SuccessContactModal = ({ isOpen, onClose }: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTitle />
      <AlertDialogContent className="pt-[54px] pb-[33px] w-[338.02px] h-[193.64px] bg-white rounded-xl">
        <p className="text-center text-[#2f2c3f] text-base font-medium font-['SUIT Variable'] uppercase">
          메시지 전송 완료
        </p>
        <button
          onClick={onClose}
          className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex mx-auto mt-[42px]"
        >
          <p className="text-[#2f2c3f] text-base font-bold font-['SUIT Variable'] uppercase">
            확인
          </p>
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
