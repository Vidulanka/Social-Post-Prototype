import '../index.css'

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                 Social Media Interactor Prototype developed by ©
                
                <strong>M.K Bhagya Prasadini</strong> &nbsp;|&nbsp; <small>22UG3-0295</small>
                
                <strong>W.P. Sachini Samudika</strong> &nbsp;|&nbsp; <small>22UG3-0287</small>
                 <br/>
                <strong>E.Pasindu Vidulanka</strong> &nbsp;|&nbsp; <small>22UG3-0288</small>
                
                <strong>W.A. Dimosh Threenath</strong> &nbsp;|&nbsp; <small>22UG3-0297</small>
                
                <strong>I.V.A. Samaranayake</strong> &nbsp;|&nbsp; <small>22UG3-0037</small>
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#f0f6ff',
        padding: '12px 16px',           // reduced padding
        textAlign: 'center',
        borderTop: '1px solid #cbd5e1', // thinner border
        marginTop: 'auto',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)', // lighter inner shadow
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#334155',
        fontSize: '12px',              // smaller font size here for whole footer
        lineHeight: '1.4',
        letterSpacing: '0.01em',
        fontWeight: '400',
    },
    content: {
        margin: 0,
        padding: 0,
    },
}

export default Footer
