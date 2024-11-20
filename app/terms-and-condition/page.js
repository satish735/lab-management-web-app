
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <UserLayout>
            <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333',marginBottom:'30px' }}>
                <h1
                    style={{
                        textAlign: 'center',
                        fontSize: '33px',
                        marginBottom: '30px',
                        padding: '30px 0',
                        backgroundColor: '#003747',
                        color: 'white',
                        fontWeight: 700
                    }}
                >
                    Terms and Conditions
                </h1>

                <div className='midbox-inner'>


                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>TERMS OF USE</h2>
                    <p>
                        These Terms of Use (this &quot;Agreement&quot;) set forth the standards of use of the SSDBC Shyam Diagnostic LLP or Endolab website
                        located at <span>[insert website URL]</span> and all its associated pages and subdomains (collectively referred to as the
                            &quot;Website&quot;).
                    </p>
                    <p>The words &quot;You,&quot; &quot;Your,&quot; or &quot;User&quot; as used herein refer to all individuals accessing or using the Website for any reason.</p>
                    <p>
                        By using the Website, you represent that you have read and agree to be bound by the terms of this Agreement, as well as any
                        other guidelines, privacy policies, rules, and additional terms referenced herein, collectively referred to as &quot;Terms of Use.&quot;
                        These Terms of Use establish the legally binding terms governing your access to and use of the Website and our provision of
                        the Services (as defined below).
                    </p>
                    <p>
                        Please read these Terms of Use carefully. Your access to the Website and/or use of the Services constitutes your acceptance
                        of these Terms of Use. If you do not agree to be bound by these Terms of Use, you must not access the Website or use the
                        Services.
                    </p>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>DEFINITIONS AND INTERPRETATIONS</h2>
                    <h3 style={{ fontSize: '18px', marginTop: '20px', fontWeight: 700 }}>Definitions</h3>
                    <ul>
                        <li>
                            <strong>Account:</strong> The account successfully created by the User on the Website by entering information such as
                            name, age, gender, contact details, username, and password during the registration process. It includes any subsequent
                            updates or additions to the provided information.
                        </li>
                        <li>
                            <strong>Company:</strong> Refers to SSDBC Shyam Diagnostic LLP or Endolab, a registered entity under the applicable laws
                            of India or any of its assignees.
                        </li>
                        <li>
                            <strong>Customer:</strong> Any User who accesses the Website and completes the registration process as described in clause
                            6.
                        </li>
                        <li>
                            <strong>Health Packages:</strong> Customized diagnostic health packages offered by the Company, including any additional
                            packages introduced from time to time through the Website.
                        </li>
                        <li>
                            <strong>Fee:</strong> The price set by the Company for the Health Packages and Services, as displayed on the Website.
                        </li>
                        <li>
                            <strong>Home Collection:</strong> A facility provided by the Company for collecting diagnostic samples from the
                            Customers doorstep.
                        </li>
                        <li>
                            <strong>Order ID:</strong> A unique identifier assigned to a Customer upon booking a Service or Health Package.
                        </li>
                        <li>
                            <strong>Registration Process:</strong> The process of creating an Account on the Website as described in clause 6.
                        </li>
                        <li>
                            <strong>Services:</strong> The services offered by the Company, as described in clause 3.2, and any additional services
                            the Company may offer through the Website.
                        </li>
                        <li>
                            <strong>User:</strong> Any person accessing or using the Website.
                        </li>
                    </ul>

                    <h3 style={{ fontSize: '18px', marginTop: '20px', fontWeight: 700 }}>Interpretation</h3>
                    <ul>
                        <li>References to recitals, clauses, and sub-clauses are to those contained within this Agreement.</li>
                        <li>Headings are for reference purposes only and shall not affect the interpretation of this Agreement.</li>
                        <li>Singular terms include the plural, and vice versa.</li>
                        <li>Any reference to a statutory provision includes amendments or re-enactments thereof.</li>
                        <li>Time limits specified herein refer to those stated in the respective clauses or mutually agreed upon in writing.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>ELIGIBILITY</h2>
                    <p>To access the Website or use the Services, you must:</p>
                    <ul>
                        <li>Be at least 18 years old or the legal age to form a binding contract in your jurisdiction.</li>
                        <li>Use the Website in compliance with applicable laws and regulations.</li>
                    </ul>
                    <p>
                        Membership or use of the Website is void where prohibited by law. By accessing the Website or using the Services, you
                        represent and warrant that you meet these eligibility requirements.
                    </p>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>SERVICES</h2>
                    <p>Users are entitled to the following Services based on their registration status:</p>
                    <h3 style={{ fontSize: '18px', marginTop: '20px', fontWeight: 700 }}>Non-Registered Users:</h3>
                    <ul>
                        <li>Access to view snapshots and information about the Health Packages and other offers on the Website.</li>
                    </ul>
                    <h3 style={{ fontSize: '18px', marginTop: '20px', fontWeight: 700 }}>Registered Customers:</h3>
                    <p>Upon completing the Registration Process and payment of the applicable Fee, Customers are entitled to:</p>
                    <ul>
                        <li>View detailed information about Health Packages and offers.</li>
                        <li>Book one or more Health Packages.</li>
                        <li>Opt for Home Collection (if available) or visit the nearest designated center for sample collection.</li>
                        <li>
                            Receive notifications via email/SMS/phone calls containing details such as Order ID and Health Package information.
                        </li>
                        <li>Access test reports within the specified timeline.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>RESTRICTIONS ON USE</h2>
                    <p>You agree not to use the Website to:</p>
                    <ul>
                        <li>Violate any applicable law or regulation.</li>
                        <li>Infringe the intellectual property rights or privacy of others.</li>
                        <li>Post or transmit content that is defamatory, obscene, abusive, or otherwise objectionable.</li>
                        <li>Engage in unauthorized activities such as hacking, phishing, or distributing malicious software.</li>
                        <li>Misrepresent your identity or create false accounts.</li>
                    </ul>
                    <p>Further, you shall not:</p>
                    <ul>
                        <li>Modify, reverse-engineer, or extract source code from the Website.</li>
                        <li>Use automated means (such as bots or scrapers) to access the Website.</li>
                        <li>Transmit viruses, worms, or any harmful content.</li>
                        <li>Engage in activities that impose an unreasonable load on the Website’s infrastructure.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>ADDITIONAL TERMS</h2>
                    <ul>
                        <li>Bookings made after 4 PM may receive confirmation the next business day.</li>
                        <li>Customers must carry a photo ID, invoice copy, and Order ID when visiting a lab or using Home Collection.</li>
                        <li>
                            The Company reserves the right to amend or discontinue any Service at its discretion, with updates published on the
                            Website.
                        </li>
                        <li>
                            Each Health Package may include specific terms and conditions, which will override general Terms of Use in case of
                            conflicts.
                        </li>
                    </ul>

                    <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 700 }}>CONTACT INFORMATION</h2>
                    <p>
                        For queries related to the Terms of Use or any services provided by <strong>SSDBC Shyam Diagnostic LLP or Endolab</strong> , please contact:
                    </p>
                    <ul>
                        <li><strong>
                            Email: <a href="mailto:info@ssdbc.in" style={{ color: '#007bff' }}>info@ssdbc.in</a></strong>
                        </li>
                        <li><strong>Phone: +91-9739923174 | +91-9116133343</strong></li>
                        <li><strong>Address: SSDBC Shyam Diagnostic LLP, D-6, Banipark, Opposite Chamatkareshwar Mandir, Chamatkareshwar Marg, Jaipur, 302016</strong></li>
                    </ul>
                </div>

            </div>



        </UserLayout>
    )
}

export default page