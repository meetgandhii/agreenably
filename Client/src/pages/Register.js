import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { message } from "antd";

const { Option } = Select;


function Register() {
  const dispatch = useDispatch();
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetch("https://agreenably-website-server.onrender.com/api/certifications/getallcertifications")
      .then((response) => response.json())
      .then((data) => {
        setCertifications(data);
      })
      .catch((error) => {
        console.error("Error fetching certifications:", error);
      });
  }, []);
  function onFinish(values) {
    if (
      values.password.length >= 8 &&
      values.password.length < 23

    ) {
      dispatch(userRegister(values));
      console.log(values);
    } else if (values.password.length > 24) {
      message.error("Password is very lengthy to remember");
    } else if (values.password.length < 8) {
      message.error("Password is weak");
    }
  }
  return (
    <div className="login">
      <Row gutter={8}>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1 className="login-heading">Register</h1>
            <hr />
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true }]}
            >
              <input
                type="text"
                placeholder="Enter your name..."
                className="p-2"
              />
            </Form.Item>
            <Form.Item
              name="company_name"
              label="Company Name"
              rules={[{ required: true }]}
            >
              <input
                type="text"
                placeholder="Enter your Company Name..."
                className="p-2"
              />
            </Form.Item>
            <Form.Item
              name="interested_certifications"
              label="Interested Certifications"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple" className="registerAddCertificate"
                placeholder="Select Interested Certifications"
                style={{ width: '100%' }}
              >
                {certifications.map((certification) => (
                  <Option key={certification._id} value={certification._id}>
                    {certification.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="email_address"
              label="Email Address"
              rules={[{ required: true }]}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                className="p-2"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <input
                type="password"
                placeholder="Enter your password..."
                className="p-2"
              />
            </Form.Item>

            <button className="agreenably-btn mt-2 mb-3">Register</button>

            <Link className="registerRedirect" to="/Login">Click here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
