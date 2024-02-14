import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import styles from './Profile.module.css'
import Layout from "../../components/Layout";

const Profile = () => {
    return (
        <Layout>
            <div className={styles.profile}>
                <div className={styles.left}>
                    <MdAccountCircle size={200} color="gray"/>
                </div>
                <div className={styles.right}>
                    <div className={styles.name}>닉네임</div>
                    <div className={styles.edit}><Link to="/accounts/edit"><IoIosSettings size={20} color="gray"/></Link></div>
                    <div className={styles.intro}>안녕하세요.ㅎㅎ</div>
                    <div className={styles.posts}>게시물</div>
                    <div className={styles.friends}>친구</div>
                </div>
                
            </div>
        </Layout>
    );
};

export default Profile;