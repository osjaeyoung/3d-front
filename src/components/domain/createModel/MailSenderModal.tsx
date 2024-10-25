import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSend: (content: string) => void;
}

const XIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2071 6.20711C17.5976 5.81658 17.5976 5.18342 17.2071 4.79289C16.8166 4.40237 16.1834 4.40237 15.7929 4.79289L11 9.58579L6.20711 4.79289C5.81658 4.40237 5.18342 4.40237 4.79289 4.79289C4.40237 5.18342 4.40237 5.81658 4.79289 6.20711L9.58579 11L4.79289 15.7929C4.40237 16.1834 4.40237 16.8166 4.79289 17.2071C5.18342 17.5976 5.81658 17.5976 6.20711 17.2071L11 12.4142L15.7929 17.2071C16.1834 17.5976 16.8166 17.5976 17.2071 17.2071C17.5976 16.8166 17.5976 16.1834 17.2071 15.7929L12.4142 11L17.2071 6.20711Z"
        fill="#333333"
      />
    </svg>
  );
};

export const MailSenderModal = ({ isOpen, onClose, onSend }: Props) => {
  const [content, setContent] = useState<string | null>(null);
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex flex-col w-[590px] h-[338px] justify-center items-center inline-flex bg-white rounded-[20px]">
        <AlertDialogTitle />
        <AlertDialogHeader className="w-full flex justify-center items-end">
          <button onClick={onClose}>
            <XIcon />
          </button>
        </AlertDialogHeader>
        <textarea
          className="w-[548px] h-60 rounded border border-[#c9c9c9] p-5 placeholder:text-[#2f2c3f] placeholder:text-sm placeholder:font-medium placeholder:font-['SUIT Variable']"
          placeholder="요청사항을 작성해주세요"
          onChange={handleContent}
          value={content || ""}
        />
        <button
          onClick={() => onSend(content!)}
          className="w-[122px] h-11 mt-4 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex"
        >
          <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
            SEND
          </p>
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
