DROP TABLE PROJECT_RECOMMENT;
DROP TABLE FREE_RECOMMENT;
DROP TABLE PAYHISTORY;
DROP TABLE SUBSCRIBE;
DROP TABLE CHAT;
DROP TABLE PAYMENT;
DROP TABLE PAYMENT_CATEGORY;
DROP TABLE ENQUIRY_COMMENT;
DROP TABLE PROJECT_COMMENT;
DROP TABLE FREE_COMMENT;
DROP TABLE PROJECT_BOARD;
DROP TABLE ENQUIRY_BOARD;
DROP TABLE FREE_BOARD;
DROP TABLE ANNOUNCEMENT_BOARD;
DROP TABLE PROJECT_HISTORY;
DROP TABLE MEMBER;
-- FREE_COMMENT ������ ����
DROP SEQUENCE FREC_POST_NO;

-- PROJECT_COMMENT ������ ����
DROP SEQUENCE PROC_POST_NO;

-- ENQUIRY_COMMENT ������ ����
DROP SEQUENCE PROE_POST_NO;

-- ANNOUNCEMENT_BOARD ������ ����
DROP SEQUENCE ANN_POST_NO;

-- FREE_BOARD ������ ����
DROP SEQUENCE FRE_POST_NO;

-- ENQUIRY_BOARD ������ ����
DROP SEQUENCE ENQ_POST_NO;

-- PROJECT_BOARD ������ ����
DROP SEQUENCE PRO_POST_NO;


CREATE TABLE MEMBER (
	MEMBER_ID VARCHAR2(50) PRIMARY KEY,
	MEMBER_PWD VARCHAR2(100) NOT NULL,
	MEMBER_NAME VARCHAR2(50) NOT NULL,
    EMAIL VARCHAR2(50) NOT NULL,
	PHONE VARCHAR2(20) NOT NULL,
	BIRTH DATE NOT NULL,
	ADDRESS VARCHAR2(200) NOT NULL,
	STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN ('Y','N','A')),
	P_IMG VARCHAR2(200) DEFAULT 'TEST.JPG' NOT NULL
);

CREATE TABLE PROJECT_HISTORY (
	H_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	H_REQUEST VARCHAR2(4000) NOT NULL,
	H_FILE VARCHAR2(200) NOT NULL UNIQUE,
	H_TIME DATE DEFAULT SYSDATE NOT NULL,
	H_STATUS CHAR(1) DEFAULT 'N' CHECK (H_STATUS IN ('Y','N'))
);

CREATE SEQUENCE ANN_POST_NO;
CREATE TABLE ANNOUNCEMENT_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	IMG_FILE VARCHAR2(300),
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE FRE_POST_NO;
CREATE TABLE FREE_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	IMG_FILE VARCHAR2(300),
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	POST_COUNT NUMBER DEFAULT 0,
	FREEBOARD_RECOMMEND NUMBER DEFAULT 0,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE ENQ_POST_NO;
CREATE TABLE ENQUIRY_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	IMG_FILE VARCHAR2(300),
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
	RECOMMEND NUMBER DEFAULT 0,
	PRIVATE_ENQUIRY CHAR(1) DEFAULT 'N' CHECK (PRIVATE_ENQUIRY IN('Y','N')),
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
CREATE SEQUENCE PRO_POST_NO;
CREATE TABLE PROJECT_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	IMG_FILE VARCHAR2(300),
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
	RECOMMEND NUMBER DEFAULT 0,
	PRIVATE_PROJECT VARCHAR2(1) DEFAULT 'Y' CHECK (PRIVATE_PROJECT IN('Y','N')),
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE FREC_POST_NO;
CREATE TABLE FREE_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_NO NUMBER REFERENCES FREE_BOARD(POST_NO),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
CREATE SEQUENCE PROC_POST_NO;
CREATE TABLE PROJECT_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_NO NUMBER REFERENCES PROJECT_BOARD(POST_NO),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE PROE_POST_NO;
CREATE TABLE ENQUIRY_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	POST_NO NUMBER REFERENCES ENQUIRY_BOARD(POST_NO),
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE TABLE PAYMENT_CATEGORY (
    PAY_CODE NUMBER PRIMARY KEY,
    PAY_VALUE VARCHAR2(20) NOT NULL
);

CREATE TABLE PAYMENT (
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    PAY_CODE NUMBER REFERENCES PAYMENT_CATEGORY(PAY_CODE),
    PAY_INFOMATION VARCHAR2(50) NOT NULL
);

CREATE TABLE CHAT (
	C_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	C_DAY DATE DEFAULT SYSDATE NOT NULL,
	C_TIME DATE DEFAULT SYSDATE NOT NULL,
	C_STATUS CHAR(1) DEFAULT 'Y' CHECK (C_STATUS IN('Y','N')),
	C_FILE VARCHAR2(100) NOT NULL
);

CREATE TABLE SUBSCRIBE (
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	S_STATUS CHAR(1) DEFAULT 'N' CHECK (S_STATUS IN('Y','N')),
	S_DATE DATE DEFAULT SYSDATE NOT NULL,
	S_PERIOD NUMBER NOT NULL,
	S_LEVEL NUMBER NOT NULL
);

CREATE TABLE PAYHISTORY (
	P_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	P_STATUS CHAR(1) DEFAULT 'N' CHECK (P_STATUS IN('Y','N')),
	P_PRODUCT VARCHAR2(20) NOT NULL,
	P_PRICE NUMBER NOT NULL,
	P_DAY DATE DEFAULT SYSDATE NOT NULL,
	P_TIME DATE DEFAULT SYSDATE NOT NULL
);

CREATE TABLE FREE_RECOMMENT (
    COMMENT_NO NUMBER PRIMARY KEY,
    MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    FREEBOARD_NO NUMBER REFERENCES FREE_BOARD,
    COMMENT_TEXT VARCHAR2(900) NOT NULL,
    COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'N' CHECK (STATUS IN('Y','N'))
);

CREATE TABLE PROJECT_RECOMMENT (
    REPLY_NO NUMBER PRIMARY KEY,
    MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    COMMENT_NO NUMBER REFERENCES PROJECT_COMMENT(COMMENT_NO),
    REPLY VARCHAR2(900) NOT NULL,
    REPLY_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
