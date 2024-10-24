import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export const AuthenticationModal = ({ isOpen, onClose }: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTitle />
      <AlertDialogContent className="p-[30px] bg-white rounded-[10px] shadow border border-[#f0f1f6] flex-col justify-center items-center gap-[30px] flex max-w-[325px]">
        <p className="self-stretch text-center text-[#555555] text-base font-medium font-['Pretendard'] leading-normal">
          로그인 이후 이용해주세요
        </p>
        <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
          <button
            onClick={onClose}
            className="grow shrink basis-0 h-[45px] px-[95px] py-5 bg-[#00a3ff] rounded-md justify-center items-center gap-2.5 flex"
          >
            <p className="text-center text-white text-sm font-bold font-['Pretendard'] leading-none">
              확인
            </p>
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
