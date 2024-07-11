import React from 'react';
import NavBar from "../../NavBar/NavBar.tsx";
import Footer from "../../Footer/Footer.tsx";
import "./Policy.css"


const Policy = () => {
    return (
        <div>
            <NavBar active="0" />
            <div className={"policyContainer"}>
                <div className={"policyTitle"}>
                    <h1>Our Policies</h1>
                </div>
                <br/><br/>
                <div className={"policies"}>
                    <h2 className={"policyHeader"}>Privacy Policy</h2>

                    <p>Thank you for visiting our ecommerce website. This Privacy Policy explains how we collect, use,
                        and protect your personal information.</p>
                    <br/>
                    <h4>Information We Collect</h4>

                    <p> When you visit our website, we automatically collect certain information about your device,
                        including information about your web browser, IP address, and some cookies that are installed on
                        your device. Additionally, as you browse the website, we collect information about the
                        individual web pages or products that you view, what websites or search terms referred you to
                        the website, and information about how you interact with the website. We refer to this
                        information as "Device Information."</p>
                    <br/>
                    <h4>How We Use Your Information</h4>

                    <p> We use the Device Information that we collect to help us screen for potential risk and fraud (in
                        particular, your IP address), and more generally to improve and optimize our website (for
                        example, by generating analytics about how our customers browse and interact with the website,
                        and to assess the success of our marketing and advertising campaigns).</p>
                    <br/>
                    <h4>Sharing Your Information</h4>

                    <p> We may share your Personal Information to comply with applicable laws and regulations, to
                        respond to a subpoena, search warrant, or other lawful request for information we receive, or to
                        otherwise protect our rights.</p>

                    <br/>
                    <p>We may update this privacy policy from time to time in order to reflect, for example, changes to
                        our practices or for other operational, legal, or regulatory reasons.</p>
                    <br/>
                    <h4>Contact Us</h4>

                    <p> For more information about our privacy practices, if you have questions, or if you would like to
                        make a complaint, please contact us by e-mail at <a
                            href="mailto:shadowposters@gmail.com">shadowposters@gmail.com</a>.</p>

                </div>
                <br/><br/><br/>
                <div className={"policies"}>
                    <h2 className={"policyHeader"}>Returns</h2>
                    <p>Thank you for shopping with us. We strive to ensure that every customer has a satisfactory
                        experience with our products. Please read our return policy carefully before making your
                        purchase.</p>
                    <br/>
                    <h4>Returns</h4>

                    <p> We do not accept returns or exchanges unless the item you purchased is defective. If you receive
                        a defective item, please contact us at <a
                            href="mailto:shadowposters@gmail.com">shadowposters@gmail.com</a> with details of the
                        product and the defect.</p>


                    <p>Upon receipt of the returned product, we will fully examine it and notify you via email, within a
                        reasonable period of time, whether you are entitled to a replacement as a result of the defect.
                        If you are eligible, we will send you a replacement product.</p>
                    <br/>
                    <h4>Refunds</h4>

                    <p>We do not issue refunds for products purchased through our website. If you are dissatisfied with
                        your purchase for any reason, please contact us at <a
                            href="mailto:shadowposters@gmail.com">shadowposters@gmail.com</a> to discuss your concerns.
                    </p>


                </div>
                <br/><br/>

            </div>

            <Footer/>

        </div>
    );
};

export default Policy;
