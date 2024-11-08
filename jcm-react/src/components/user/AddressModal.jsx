import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import '../../css/user/AddressModal.css';

const AddressModal = (props) => {

    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        props.setcompany({
            ...props.company,
            address:fullAddress,
        })
    }
    return (
        <div className="address-main">
            <DaumPostcode
                className="addressmodal"
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default AddressModal;