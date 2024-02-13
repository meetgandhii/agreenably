import React, { useState } from "react";
import { Form, Select, Divider, Radio, Slider, message } from "antd";
import axios from "axios";
import moment from "moment";
import emailjs from 'emailjs-com';
import { FaArrowLeft } from 'react-icons/fa';
import DefaultLayout from "../components/DefaultLayout";
import "../Stylesheet/recommendation.css";
const { Option } = Select;

const Recommendation = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const revenues = [
        'less than 50k',
        '50K - 100K',
        '100K - 500K',
        '500K - 1M',
        'more than 1M',
    ];
    const industries = ["Agriculture",
        "Apparel",
        "Automotives",
        "Beverages & drinks",
        "Chemicals & Chemical Products",
        "Cleaning products",
        "Construction",
        "Energy",
        "Food products",
        "Forestry & logging",
        "Personal care products",
        "Jewelry & related articles",
        "Laundry & dry-cleaning",
        "Livestock",
        "Materials recovery & recycling",
        "Paper & paper products",
        "Pet Care",
        "Processed products",
        "Restaurants & food service",
        "Rubber & plastics products",
        "Sports & yoga goods",
        "Supplements",
        "Textiles",
        "Wood & wood products"
    ];
    const preferences = ["Social", "Environmental"];

    const [form] = Form.useForm();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isContacted, setIsContacted] = useState(false);

    const getInTouch = async () => {
        try {
            const { email, website } = form.getFieldsValue(['email', 'website']);
            const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
            // Check if any of the required fields is empty
            if (!email || !website) {
                const missingFields = [];
                if (!email) missingFields.push('Email');
                if (!website) missingFields.push('Website');

                const alertMessage = `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required for "Get in Touch"`;
                alert(alertMessage);
                return; // Do not proceed if any required field is not filled
            }
            // Send the email to the new 'Get in Touch' API endpoint
            const response = await axios.post('https://agreenably-website-server.onrender.com/api/recommendation/getintouch', {
                userId: user._id,
                timeStamp: timestamp, email, website
            });
            setIsContacted(true);
            message.success('We have recieved your email and website, someone from our team will contact you shortly!');
            console.log('Get in Touch:', response.data);
        } catch (error) {
            console.error('Error while getting in touch:', error);
        }
    };
    const submitRecommendation = async (values) => {
        const timestamp = moment().format("HH:mm:ss-DD/MM/YYYY");
        try {
            emailjs.init('aFlB4eglvBuHMdfN6');
            await emailjs.send(
                'service_77kcfnm',
                'template_m9z41wd',
                {
                    userId: user._id,
                    timeStamp: timestamp,
                    email: values.email,
                    website: values.website,
                    industries: values.industries.join(', '), 
                    revenue: values.revenue,
                    budget: values.budget,
                    preferences: values.preferences.join(', '),
                }
            );
            const response = await axios.post("https://agreenably-website-server.onrender.com/api/recommendation/addrecommendation", {
                userId: user._id,
                timeStamp: timestamp,
                ...values,
            });
            setIsFormSubmitted(true);
            message.success('Recommendation submitted successfully, someone from our team will contact you shortly!');
            console.log("Recommendation submitted successfully:", response.data);
        } catch (error) {
            console.error("Error while adding recommendation:", error);
        }
    };

    return (
        <div className="booking-car-container">
            <DefaultLayout />
            <div style={{ display: "flex", width: "100%" }}>
                <div className="booking-car-content">
                    <div style={{ position: 'sticky', top: 0, backgroundColor: '#f2f1f2', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <button onClick={{}} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <FaArrowLeft style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                        </button>
                        <h1 className="certification-name" style={{ margin: 0 }}> {"Recommendation Engine"}</h1>
                        <div style={{ width: '1.5rem' }}></div>
                    </div>
                    <div className="certificate_questionnaire" style={{ height: isFormSubmitted || isContacted ? "100vh" : "auto" }}>

                        {isContacted ? (
                            <div style={{ textAlign: 'center', margin: '20px', padding: '20px', backgroundColor: '#e6f7ff', borderRadius: '5px' }}>
                                <h2>Thank you, we have received your email and website</h2>
                                <p style={{ textAlign: "center" }}>Someone from our team will be contacting you shortly!</p>
                            </div>
                        ) : (
                            <>
                                {isFormSubmitted ? (
                                    <div style={{ textAlign: 'center', margin: '20px', padding: '20px', backgroundColor: '#e6f7ff', borderRadius: '5px' }}>
                                        <h2>Thank you for your submission!</h2>
                                        <p style={{ textAlign: "center" }}>Your recommendation has been submitted successfully. Someone from our team will be contacting you shortly!</p>
                                    </div>
                                ) : (
                                    <>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={submitRecommendation}
                                        >
                                            <div>
                                                <div className="sectionStyle">
                                                    <h1 className="question-type">Enter Email</h1>
                                                    <Divider className="todo-news-divider" />
                                                    <Form.Item
                                                        name="email"
                                                        label="Email Address"
                                                        rules={[{ required: true, message: 'Please enter the email' }]}
                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your email..."
                                                            className="inputStyleText p-2"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="sectionStyle">
                                                    <h1 className="question-type">Enter Website</h1>
                                                    <Divider className="todo-news-divider" />
                                                    <Form.Item
                                                        name="website"
                                                        label="Website"
                                                        rules={[{ required: true, message: 'Please enter the website' }]}
                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your website..."
                                                            className="inputStyleText p-2"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="sectionStyle">
                                                    <h1 className="question-type">Select All Possible Industries</h1>
                                                    <Divider className="todo-news-divider" />
                                                    <Form.Item
                                                        name="industries"
                                                        label="Industries"
                                                        rules={[{ required: true, message: 'Please select the industry(or industries)' }]}
                                                    >
                                                        <Select mode="multiple" placeholder="Select industries" className="recommendationMultiple" style={{ width: '100%' }}>
                                                            {industries.map((industry) => (
                                                                <Option key={industry}>{industry}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                                <div className="sectionStyle">
                                                    <h1 className="question-type">Select Revenue</h1>
                                                    <Divider className="todo-news-divider" />
                                                    <Form.Item
                                                        name="revenue"
                                                        label="Select Revenue"
                                                        rules={[{ required: true, message: 'Please select the revenue range' }]}
                                                    >
                                                        <Radio.Group>
                                                            {revenues.map((option) => (
                                                                <Radio key={option} value={option}>
                                                                    {option}
                                                                </Radio>
                                                            ))}
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div className="sectionStyle">
                                                    <h1 className="question-type">Select Budget</h1>
                                                    <Divider className="todo-news-divider" />
                                                    <Form.Item
                                                        name="budget"
                                                        label="Select Budget"
                                                        rules={[{ required: true, message: 'Please select the budget' }]}
                                                    >
                                                        <Slider
                                                            max={10000}
                                                            marks={{ 0: '0', 10000: '10000' }}
                                                            step={100}
                                                            tooltipVisible
                                                            style={{ width: '100%' }}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="sectionStyle">
                                                <h1 className="question-type">Select Preference</h1>
                                                <Divider className="todo-news-divider" />
                                                <Form.Item
                                                    name="preferences"
                                                    label="Preferences"
                                                    rules={[{ required: true, message: 'Please select the preference(or preferences)' }]}
                                                >
                                                    <Select mode="multiple" placeholder="Select preferences" className="recommendationMultiple" style={{ width: '100%' }}>
                                                        {preferences.map((preference) => (
                                                            <Option key={preference}>{preference}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                            <button type="submit" className="agreenably-btn mt-2 mb-3">Register</button>
                                        </Form>
                                        <button onClick={getInTouch} className="agreenably-btn-getInTouch">Get in touch</button>
                                    </>
                                )}
                            </>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommendation;
