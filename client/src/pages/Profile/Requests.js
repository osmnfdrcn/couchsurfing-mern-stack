import { useEffect, useState } from "react"
import Wrapper from "../../assets/wrappers/Requests"
import Filter from "../../components/Filter"
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useAppContext } from "../../context/appContext"
import SingleRequest from "../../components/SingleRequest"
import { SectionHeading } from "../../components/Headings"

const Requests = () => {
    const [showReceivedRequests, setShowReceivedRequests] = useState(true)
    const [showSentRequests, setShowSentRequests] = useState(false)
    const { filter, getRequests, requests } = useAppContext()
    const [requestType, setRequestType] = useState('received')

    useEffect(() => {
        getRequests(requestType, filter)
        // eslint-disable-next-line
    }, [filter, requestType])

    const handleReceived = () => {
        setShowReceivedRequests(!showReceivedRequests)
        setShowSentRequests(false)
        setRequestType('received')
    }
    const handleSent = () => {
        setShowReceivedRequests(false)
        setShowSentRequests(!showSentRequests)
        setRequestType('sent')
    }

    return (
        <Wrapper>
            <section>
                <Filter />
                <div className="requests-section">
                    <SectionHeading
                        onclick={handleReceived}
                        heading='RECEIVED'
                        icon={<AiOutlineArrowDown />}
                    />

                    {
                        showReceivedRequests &&
                        <>

                            <div className="request-card">
                                {
                                    requests?.map((request) => {
                                        return (
                                            <SingleRequest
                                                requestType='received'
                                                id={request?._id}
                                                key={request?._id}
                                                fromUser={request?.fromUser}
                                                toUser={request?.toUser}
                                                fromDate={request?.fromDate}
                                                toDate={request?.toDate}
                                                message={request?.message}
                                                createdAt={request?.createdAt}
                                                numberOfNights={request?.numberOfNights}
                                                status={request?.status}

                                            />
                                        )
                                    })
                                }
                            </div>
                        </>
                    }

                </div>

                <div className="requests-section">
                    <SectionHeading
                        onclick={handleSent}
                        heading='SENT'
                        icon={<AiOutlineArrowDown />}
                    />
                    {
                        showSentRequests &&
                        <>

                            <div className="request-card">
                                {
                                    requests?.map((request) => {
                                        return (
                                            <SingleRequest
                                                requestType='sent'
                                                id={request?._id}
                                                key={request?._id}
                                                fromUser={request?.fromUser}
                                                toUser={request?.toUser}
                                                fromDate={request?.fromDate}
                                                toDate={request?.toDate}
                                                message={request?.message}
                                                createdAt={request?.createdAt}
                                                numberOfNights={request?.numberOfNights}
                                                status={request?.status}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </>
                    }

                </div>
            </section>
        </Wrapper>
    )
}

export default Requests