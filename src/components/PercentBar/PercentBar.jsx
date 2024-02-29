import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";

const PercentBar = ({ language, percentage, onChange, onDelete }) => {
    const [percent, setPercent] = useState(percentage || 50);

    // prop에서 percentage 값이 변경될 때마다 내부의 percent 상태를 업데이트합니다.
    useEffect(() => {
        setPercent(percentage || 0);
    }, [percentage]);

    // 퍼센트 바 클릭 시 퍼센트 변경
    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const totalWidth = rect.width;
        const clickedPercent = parseInt((offsetX / totalWidth) * 100);
        setPercent(clickedPercent);

        // 새로운 퍼센트 값을 부모 컴포넌트로 전달
        if(language) onChange(language, clickedPercent);
        else onChange(clickedPercent);
    };

    // 삭제 버튼을 클릭할 때 언어를 삭제
    const handleDelete = () => {
        onDelete(language);
      };

  return (
    <div className="row align-items-center col-form-label">
        <div className="d-flex align-items-center">
            {language && (<label className='col-sm-2'>{language}</label>)}
            <div className="col-form-label">
                <div className="progress" style={{ width: '300px', marginRight:"10px"}} onClick={handleClick}>
                    <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    >
                    {`${percent}%`}
                    </div>
                </div>
            </div>
            {language && (<span onClick={handleDelete}><RiDeleteBinLine/></span>)}
            {/* <div>{`${percent}%`}</div> */}
        </div>
        
    </div>
  );
};

export default PercentBar;
