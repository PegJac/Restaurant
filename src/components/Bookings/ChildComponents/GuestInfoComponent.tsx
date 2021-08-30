import { ChangeEvent } from "react"
import react from "react"
import { IGuestInfoComponent } from "../../models/IGuestInfoComponent"

export function GuestInfoComponent(props: IGuestInfoComponent) {

    function updateUserInfo(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        props.updateInformation(name, value)
        console.log(name + value)
    }

    return (
        <div>
            <input onChange={(e) => updateUserInfo(e)} autoComplete="no" type="text" placeholder="First name" name="firstName" />
            <input onChange={(e) => updateUserInfo(e)} autoComplete="no" type="text" placeholder="Last name" name="lastName" />
            <input onChange={(e) => updateUserInfo(e)} autoComplete="no" type="email" placeholder="Email" name="email" />
            <input onChange={(e) => updateUserInfo(e)} autoComplete="no" type="number" placeholder="Phone" name="number" />

            <p>det här är en länk till gdpr</p>
            <input type="checkbox" />

            <button type="button">Book</button>
        </div>
    )
}