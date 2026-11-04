import LogoImg from "@/assets/images/logo.svg";

function Logo() {
  return (
    <a href="/" aria-label="Neoncore Home">
      <img src={LogoImg} alt="Neoncore" />
    </a>
  );
}

export default Logo;
