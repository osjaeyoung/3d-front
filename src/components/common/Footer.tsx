import styled from "styled-components";
import { FacebookIcon, InstagramIcon, KakaoIcon } from "../icons";

export const Footer = () => {
  const handleClickKakao = () => {
    window.open("https://pf.kakao.com/_FXWZn");
  };
  const handleClickInstagram = () => {
    window.open(
      "https://www.instagram.com/diypaper_company/profilecard/?igsh=cWFjbHlmdjE5Znpw"
    );
  };
  const handleClickFacebook = () => {
    window.open("https://www.facebook.com/share/FBYq2Y3nfEu7CivE/");
  };

  return (
    <Container className="relative transform translate-y-[calc(100%-80px)] w-full h-20 px-10 bg-[#2f2c3f] justify-between items-center inline-flex">
      <div className="w-full max-w-[312px] flex-col justify-start items-start gap-1 inline-flex">
        <p className="self-stretch text-white text-[10px] font-medium font-['SUIT Variable']">
          경기 용인시 처인구 동부로 61 용인예술과학대 창의관 506-1호
        </p>
        <div className="justify-start items-center gap-[15px] inline-flex">
          <p className="text-white text-[10px] font-medium font-['Helvetica Neue']">
            Email : boricolder@gmail.com
          </p>
          <p className="text-white text-[10px] font-medium font-['Helvetica Neue']">
            FAX: 0507-1382-2518
          </p>
        </div>
        <p className="self-stretch text-white text-[10px] font-medium font-['Helvetica Neue']">
          © 2024 DIYPAPER. All Rights Reserved
        </p>
      </div>
      <div className="justify-start items-center gap-[30px] flex">
        <KakaoIcon onClick={handleClickKakao} />
        <InstagramIcon onClick={handleClickInstagram} />
        <FacebookIcon onClick={handleClickFacebook} />
      </div>
    </Container>
  );
};

const Container = styled.footer`
  position: relative;
  transform: translateY(calc(100% - 80px));
`;
