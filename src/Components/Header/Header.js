import "./Header.css";

const Header = ({ black }) => {
  return (
    <header className={black ? "header--black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://pngimg.com/uploads/netflix/netflix_PNG32.png"
            alt="sem conecção"
          ></img>
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
            alt="sem conecção"
          ></img>
        </a>
      </div>
    </header>
  );
};

export default Header;
