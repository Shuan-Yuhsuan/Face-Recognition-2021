import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2 pa3' tiltMaxAngleX='35' tiltMaxAngleY='35' style={{height: '150px', width: '150px'}}>
                <div>
                    <img alt='logo' src={brain}></img>
                </div>
            </Tilt>
        </div>
    );
}


export default Logo;