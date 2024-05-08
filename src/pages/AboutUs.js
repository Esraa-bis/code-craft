import styles from "../assets/css/AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Welcome to Code Craft</h2>
        <p className={styles.description}>
          Code Craft is the leading hub for mastering the art of software
          engineering. At Code Craft Academy, we understand that software
          development transcends mere skill—it's an art form that defines the
          future of technology. Our unwavering dedication to excellence drives
          our mission: to cultivate the future of software engineering by
          empowering individuals with the expertise, capabilities, and hands-on
          experience essential for success in today's ever-evolving digital
          realm.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
