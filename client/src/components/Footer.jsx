import React from 'react'

const Footer = () => {
    const da = new Date();
    return (
        <>
            <footer class="page-footer font-small position-absolute bottom-0 w-100" style={{ background: "#212529" }}>
                <div class="footer-copyright text-center py-3" style={{ color: "white" }}> Copyright © {da.getFullYear()}
                    <span> rKepp by Ritesh</span>
                </div>
            </footer>
        </>
    )
}

export default Footer