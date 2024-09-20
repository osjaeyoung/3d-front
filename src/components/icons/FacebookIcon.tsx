interface SocialIconProps {
  onClick: () => void;
}

export const FacebookIcon = ({ onClick }: SocialIconProps) => {
  return (
    <button onClick={onClick}>
      <svg
        width="45"
        height="44"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.65 43.9301C34.7616 43.9301 44.5801 34.1117 44.5801 22.0001C44.5801 9.88852 34.7616 0.0700684 22.65 0.0700684C10.5384 0.0700684 0.720093 9.88852 0.720093 22.0001C0.720093 34.1117 10.5384 43.9301 22.65 43.9301Z"
          fill="#425892"
        />
        <path
          d="M26.52 13.71H29.16V9.57001H25.2101C25.2101 9.57001 22.7301 9.51001 21.1401 11.57C21.1401 11.57 20.06 12.59 20.05 15.56V18.67H16.15V23.07H20.05V34.43H24.55V23.07H28.42L28.9601 18.67H24.55V15.56C24.56 15.21 24.72 13.68 26.52 13.71Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
