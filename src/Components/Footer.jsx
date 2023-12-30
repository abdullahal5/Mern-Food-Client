const Footer = () => {
    return (
      <div>
        <footer className="footer p-10 bg-base-200 text-base-content section-container">
          <aside>
            <img src="/logo.png" alt="" />
            <p>
              Savor the artistry where <br /> every dish is a culinary <br />{" "}
              masterpiece
            </p>
          </aside>
          <nav>
            <header className="footer-title">Useful Links</header>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Events</a>
            <a className="link link-hover">Blogs</a>
            <a className="link link-hover">FAQ</a>
          </nav>
          <nav>
            <header className="footer-title">Main Menu</header>
            <a className="link link-hover">Home</a>
            <a className="link link-hover">Offers</a>
            <a className="link link-hover">Menus</a>
            <a className="link link-hover">Reservation</a>
          </nav>
          <nav>
            <header className="footer-title">Contact Us</header>
            <p className="link link-hover">abdullahalfahin183@gmail.com</p>
            <p className="link link-hover">+880 1798 500503</p>
            <p className="link link-hover">Social media</p>
          </nav>
        </footer>
      </div>
    );
};

export default Footer;