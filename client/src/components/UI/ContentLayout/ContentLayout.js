import { PageTitle } from "../../PageTitle/PageTitle"
import './ContentLayout.styles.scss'

export const ContentLayout = (props) => {
    return (
        <>
            <PageTitle />
            <div className="page-content-inner">
                <div className="demo-card is-dark">
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}