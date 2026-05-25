import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqTitle = {
        color: '#000',
        textAlign: 'left',
        border: 'none',
        width: '100%',
        padding: '15px 10px !importaint',
        background: '#dddddd26',
        fontSize: '20px',
        fontWeight: '500',
        
       
    }

    const faqanswer = {
        padding: '20px 13px',
        lineHeight: '33px',
        fontSize: '17px',
        borderTop:'1px solid #ddd'
    }


    const faqData = [
        {
            id: "01",
            question: 'Who can apply for a loan?',
            answer: 'Any Indian resident aged 21–55 with a valid bank account and income proof.',
        },
        {
            id: "02",
            question: 'How fast is loan approval?',
            answer: 'Applications are reviewed instantly — most approvals happen within minutes.',
        },
        {
            id: "03",
            question: 'What documents are required?',
            answer: 'Typically PAN, Aadhaar, bank statements, and income proof (employment or salary slip).',
        },
        {
            id: "04",
            question: 'Is my data secure??',
            answer: 'Yes — we use the latest encryption to ensure your data remains protected.',
        },

        {
            id: "05",
            question: 'Are there hidden charges?',
            answer: 'Never. All terms — including fees and interest — are shared upfront before you agree.',
        },
        {
            id: "06",
            question: 'Can I repay early? ',
            answer: 'Yes! Early repayment options are available — this can reduce total interest.',
        },
        {
            id: "07",
            question: 'What happens if my loan is rejected?',
            answer: 'You can update your information and reapply. Rejections are based on eligibility and credit profile.',
        },
        

    ];

    return (
        <>

            <div className="faq-wrap">
                <div className='text-center'>
                    <p className='tag'>FAQ</p>
                    <h3 className='main-heading'>Frequently Asked Questions</h3>
                </div>

                <div className="faq-list pt-4">
                    {
                        faqData.map((faq, index) => {
                            return (
                                <>
                                    <div className='ms_faq_wrap' key={faq.id}>
                                        <button className='p-2' style={faqTitle} onClick={() => toggleAnswer(index)}>{faq.question}
                                            {openIndex === index ? (
                                                <KeyboardArrowDownIcon style={{ float: 'right' }} />
                                            ) : (
                                                <KeyboardArrowUpIcon style={{ float: 'right' }} />
                                            )}
                                        </button>
                                        {openIndex === index && (
                                            <div style={faqanswer}>
                                              {faq.answer}

                                            </div>
                                        )}
                                    </div>
                                </>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    )
}
