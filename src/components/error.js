import React from 'react'
import {Link} from 'react-router-dom'

function Error() {
    return (
        <div className="error">
            <h4><span style={{"color":"red"}}>Error 404</span>: Page Doesn't Exist</h4>
            <Link to="/">Go to Home Page</Link>
        </div>
    )
}

export default React.memo(Error)
