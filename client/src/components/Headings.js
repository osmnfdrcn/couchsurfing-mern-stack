import Wrapper from "../assets/wrappers/Headings"

const MainHeading = ({ heading }) => {
    return (
        <Wrapper>
            <h3 className="main-heading">{heading}</h3>
        </Wrapper>
    )
}

const SectionHeading = ({ onclick, heading, icon }) => {
    return (
        <Wrapper>
            <h3 className="section-heading" onClick={onclick}> <span>{icon}</span> {heading} </h3>
        </Wrapper>

    )
}
export { MainHeading, SectionHeading }