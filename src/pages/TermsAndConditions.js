import React from "react";
import styles from "../assets/css/policy.module.css";

function Policy() {
  return (
    <div className={styles.Policy}>
      <h1>Our Policy</h1>
      <section>
        <h2>Course Offerings</h2>
        <p>
          <strong>Free Courses</strong>
        </p>
        <ul>
          <li>
            <strong>Duration</strong>: Free courses are available for a maximum
            of 2 hours.
          </li>
          <li>
            <strong>Tiers</strong>: A free Tier 1 video is available for users
            to sample our content.
          </li>
        </ul>
        <p>
          <strong>Uploads and Edits</strong>
        </p>
        <ul>
          <li>
            If you upload a new course or make edits to an existing one, the
            course will need to be approved by the admin first.
          </li>
        </ul>
      </section>

      <section>
        <h2>Business Policy</h2>
        <p>
          <strong>Pricing Limitations</strong>
        </p>
        <ul>
          <li>
            All courses are subject to price limitations to ensure affordability
            for our users.
          </li>
          <li>
            <strong>Maximum price is 3000 EGP</strong>
          </li>
        </ul>
        <p>
          <strong>Course Approval</strong>
        </p>
        <ul>
          <li>
            All courses must be approved by the admin before being published on
            the platform.
          </li>
        </ul>
        <p>
          <strong>Revenue Sharing</strong>
        </p>
        <ul>
          <li>
            Content creators will receive 60% of the price of each course sold
            on our platform.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Policy;
