import DaumPostcode from "react-daum-postcode";
import '../../css/user/AddressModal.css';

const AddressModal = ({ setAddress, setPopup }) => {

    const complete = (data) => {
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
        
        // 주소 설정 및 모달 닫기
        setAddress(fullAddress);
        setPopup(false);  // 모달 닫기
    }

    return (
        <div>
            <DaumPostcode
                className="addressmodal"
                autoClose
                onComplete={complete}
            />
        </div>
    );
};

export default AddressModal;
