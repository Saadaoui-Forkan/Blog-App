const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={styles}>
        <span>
            &copy; {currentYear} | Created by{' '}
            <a
            href="https://www.linkedin.com/in/saadaoui-mahmoud"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            >
            Saadaoui Mahmoud
            </a>
        </span>
        </footer>
    );
};
  
const styles = {
    color: 'var(--white-color)',
    fontSize: '16px',
    backgroundColor: 'var(--blue-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    padding: '0 10px',
    textAlign: 'center',
};

const linkStyle = {
    color: 'var(--white-color)',
    fontWeight: 'bold',
    marginLeft: '4px',
};

export default Footer;
  