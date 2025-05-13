import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { useState } from 'react';
import { validateEmail } from '../../lib/validators';
import '../components/styles/modal.scss'
import flutterwaveConfig from '../config/flutterwave.config';
import Button from './buttons/Button';
import Modal from './Modal';

const BuyMovieButton = ({ _currency = 'USD', price }) => {
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState(window.localStorage.getItem('afri_email') || '')

    const handleFlutterPayment = useFlutterwave(flutterwaveConfig(_currency, email, number, name));

    const initPurchase = () => {
        handleFlutterPayment({
            callback: (response) => {
                // console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => { },
        });
    }

    return <>
        <Modal title='Begin payment' show={showModal} onClose={() => setShowModal(false)}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' type='text' />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type='email' />
            <input value={number} onChange={e => setNumber(e.target.value.toString())} placeholder='Phone number' type='number' />
            {
                name.trim() !== '' &&
                    validateEmail(email) &&
                    number.length > 7 ?
                    <Button label='BUY MOVIE' action={initPurchase} />
                    : <></>
            }
        </Modal>
        <div onClick={() => setShowModal(true)} className="price-btn">
            <p>{_currency}{price}</p>
            <div>
                <img loading="lazy" src='/assets/svg/shopping-bag.svg' alt='shopping bag' title='shopping bag'/>
            </div>
        </div>
    </>
}

export default BuyMovieButton

// 0244350147