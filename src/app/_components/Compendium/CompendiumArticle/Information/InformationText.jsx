import React from 'react';
import styles from '../CompendiumArticle.module.css'

function InformationText({children}){
    return (
        <p className={styles["information__main"]}>{children}</p>
    )
}

export default InformationText;