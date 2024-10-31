import '../../css/guide/Guide.css';
import { motion } from 'framer-motion';

const Guide = () => {
    return (
        <div className='guide-container'>
            <div className="row">
                <div className="col-md-12 mb-5">
                    <h2 className="main-head">Transparent and flexible pricing</h2>
                    <p className="sub-head">Design and code in a visual, collaborative way, export for free</p>
                </div>

                {/* <!-- Purple Table --> */}
                                {/* Purple Table */}
                                <motion.div
                    className="col-md-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ ease: 'easeInOut', duration: 1 }}
                >
                    <div className="pricing-table purple">
                        <div className="pricing-label">Fixed Price</div>
                        <h2>Beginner Pack 2024</h2>
                        <h5>Made for starters</h5>
                        <div className="pricing-features">
                            <div className="feature">Bandwidth<span>50 GB</span></div>
                            <div className="feature">Add-On Domains<span>10</span></div>
                            <div className="feature">SSD Storage<span>250 GB</span></div>
                            <div className="feature">Mail Addresses<span>25</span></div>
                            <div className="feature">SEO Optimization<span>Basic</span></div>
                            <div className="feature">Customizable Design Templates<span>None</span></div>
                            <div className="feature">Site Backup<span>Monthly</span></div>
                        </div>
                        <div className="price-tag">
                            <span className="symbol">$</span>
                            <span className="amount">7.99</span>
                            <span className="after">/month</span>
                        </div>
                        <a className="price-button" href="#">Get Started</a>
                    </div>
                </motion.div>

                    {/* Turquoise Table */}
                    <motion.div
                    className="col-md-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ ease: 'easeInOut', duration: 1 }}
                >
                    <div className="pricing-table turquoise">
                        <div className="pricing-label">Fixed Price</div>
                        <h2>Intermediate Pack 2024</h2>
                        <h5>Made for experienced users</h5>
                        <div className="pricing-features">
                            <div className="feature">Bandwidth<span>150 GB</span></div>
                            <div className="feature">Add-On Domains<span>25</span></div>
                            <div className="feature">SSD Storage<span>500 GB</span></div>
                            <div className="feature">Mail Addresses<span>50</span></div>
                            <div className="feature">SEO Optimization<span>Enhanced</span></div>
                            <div className="feature">Customizable Design Templates<span>Support</span></div>
                            <div className="feature">Site Backup<span>Weekly</span></div>
                        </div>
                        <div className="price-tag">
                            <span className="symbol">$</span>
                            <span className="amount">9.99</span>
                            <span className="after">/month</span>
                        </div>
                        <a className="price-button" href="#">Get Started</a>
                    </div>
                </motion.div>

                          {/* Red Table */}
                <motion.div
                    className="col-md-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ ease: 'easeInOut', duration: 1 }}
                >
                    <div className="pricing-table red">
                        <div className="pricing-label">Fixed Price</div>
                        <h2>Advanced Pack 2024</h2>
                        <h5>Made for professionals/agencies users</h5>
                        <div className="pricing-features">
                            <div className="feature">Bandwidth<span>250 GB</span></div>
                            <div className="feature">Add-On Domains<span>50</span></div>
                            <div className="feature">SSD Storage<span>1 TB</span></div>
                            <div className="feature">Mail Addresses<span>75</span></div>
                            <div className="feature">SEO Optimization<span>Advanced</span></div>
                            <div className="feature">Customizable Design Templates<span>Support</span></div>
                            <div className="feature">Site Backup<span>Automated Daily</span></div>
                        </div>
                        <div className="price-tag">
                            <span className="symbol">$</span>
                            <span className="amount">12.99</span>
                            <span className="after">/month</span>
                        </div>
                        <a className="price-button" href="#">Get Started</a>
                    </div>
                </motion.div>
                
                {/* <!-- All plans Include --> */}
                <div className="col-md-12 mt-5">
                    <h3 className="section-head">All plans include</h3>
                    <div className="all-plans-features">
                        <div className="feature">
                            <h4>Free domain hosting</h4>
                            <p>Host your project for free on a subdomain. You can always  move to domains.</p>
                        </div>
                        <div className="feature">
                            <h4>Google Fonts</h4>
                            <p>Access a wide selection of Google Web Fonts without needing to install anything.</p>
                        </div>
                        <div className="feature">
                            <h4>Interactions and states</h4>
                            <p>Visual indicators for component states and interactive elements.</p>
                        </div>
                        <div className="feature">
                            <h4>Responsive templates</h4>
                            <p>Access a library of responsive static templates, eCommerce storefronts, and ready-to-use components.</p>
                        </div>
                        <div className="feature">
                            <h4>Global styleguide</h4>
                            <p>Organize and manage your design system colors, components, fonts to maintain brand consistency.</p>
                        </div>
                        <div className="feature">
                            <h4>Use custom fonts</h4>
                            <p>Import preferred fonts and use them in projects. Fonts are saved in your library.</p>
                        </div>
                        <div className="feature">
                            <h4>Smart Media Queries</h4>
                            <p>Simplify responsive design based on device characteristics and parameters.</p>
                        </div>
                        <div className="feature">
                            <h4>Figma Import</h4>
                            <p>Import prototypes into the platform, with developer-friendly code for HTML, CSS, or frameworks like React.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Guide;