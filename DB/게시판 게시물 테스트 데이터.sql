INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, STATUS)
VALUES (ANN_POST_NO.NEXTVAL, 'Rocomi', 'API 출시 안내', '네이버 API 출시 소식입니다.', 'image1.jpg', 100, 'Y');

INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, STATUS)
VALUES (ANN_POST_NO.NEXTVAL, 'Download', '서비스 점검 공지', '정기 점검 안내입니다.', 'image2.jpg', 250, 'Y');

INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, STATUS)
VALUES (ANN_POST_NO.NEXTVAL, '2weeks', '새로운 기능 추가', '새로운 기능에 대한 소개입니다.', 'image3.jpg', 150, 'Y');

INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, STATUS)
VALUES (ANN_POST_NO.NEXTVAL, 'Zeus', '긴급 업데이트', '긴급 업데이트 공지입니다.', 'image4.jpg', 300, 'N');

INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, STATUS)
VALUES (ANN_POST_NO.NEXTVAL, 'test1', '시스템 점검 완료', '점검 완료 안내입니다.', 'image5.jpg', 50, 'Y');


-- FREE_BOARD에 데이터 삽입
INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, STATUS)
VALUES (FRE_POST_NO.NEXTVAL, 'Rocomi', '자유 게시글 1', '첫 번째 자유 게시글 내용입니다.', 'free_image1.jpg', 100, 10, 'Y');

INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, STATUS)
VALUES (FRE_POST_NO.NEXTVAL, 'Download', '자유 게시글 2', '두 번째 자유 게시글 내용입니다.', 'free_image2.jpg', 200, 20, 'Y');

INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, STATUS)
VALUES (FRE_POST_NO.NEXTVAL, '2weeks', '자유 게시글 3', '세 번째 자유 게시글 내용입니다.', 'free_image3.jpg', 300, 30, 'Y');

INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, STATUS)
VALUES (FRE_POST_NO.NEXTVAL, 'Zeus', '자유 게시글 4', '네 번째 자유 게시글 내용입니다.', 'free_image4.jpg', 400, 40, 'N');

INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, STATUS)
VALUES (FRE_POST_NO.NEXTVAL, 'test1', '자유 게시글 5', '다섯 번째 자유 게시글 내용입니다.', 'free_image5.jpg', 500, 50, 'Y');


-- ENQUIRY_BOARD에 데이터 삽입
INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_ENQUIRY, STATUS)
VALUES (ENQ_POST_NO.NEXTVAL, 'Rocomi', '문의 사항 1', '첫 번째 문의 사항입니다.', 'enquiry_image1.jpg', 100, 5, 'N', 'Y');

INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_ENQUIRY, STATUS)
VALUES (ENQ_POST_NO.NEXTVAL, 'Download', '문의 사항 2', '두 번째 문의 사항입니다.', 'enquiry_image2.jpg', 200, 10, 'Y', 'Y');

INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_ENQUIRY, STATUS)
VALUES (ENQ_POST_NO.NEXTVAL, '2weeks', '문의 사항 3', '세 번째 문의 사항입니다.', 'enquiry_image3.jpg', 300, 15, 'N', 'Y');

INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_ENQUIRY, STATUS)
VALUES (ENQ_POST_NO.NEXTVAL, 'Zeus', '문의 사항 4', '네 번째 문의 사항입니다.', 'enquiry_image4.jpg', 400, 20, 'Y', 'N');

INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_ENQUIRY, STATUS)
VALUES (ENQ_POST_NO.NEXTVAL, 'test1', '문의 사항 5', '다섯 번째 문의 사항입니다.', 'enquiry_image5.jpg', 500, 25, 'N', 'Y');

-- PROJECT_BOARD에 데이터 삽입
INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_PROJECT, STATUS)
VALUES (PRO_POST_NO.NEXTVAL, 'Rocomi', '프로젝트 1', '첫 번째 프로젝트 게시글입니다.', 'project_image1.jpg', 100, 5, 'Y', 'Y');

INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_PROJECT, STATUS)
VALUES (PRO_POST_NO.NEXTVAL, 'Download', '프로젝트 2', '두 번째 프로젝트 게시글입니다.', 'project_image2.jpg', 200, 10, 'N', 'Y');

INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_PROJECT, STATUS)
VALUES (PRO_POST_NO.NEXTVAL, '2weeks', '프로젝트 3', '세 번째 프로젝트 게시글입니다.', 'project_image3.jpg', 300, 15, 'Y', 'Y');

INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_PROJECT, STATUS)
VALUES (PRO_POST_NO.NEXTVAL, 'Zeus', '프로젝트 4', '네 번째 프로젝트 게시글입니다.', 'project_image4.jpg', 400, 20, 'N', 'N');

INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, COUNT_VIEW, RECOMMEND, PRIVATE_PROJECT, STATUS)
VALUES (PRO_POST_NO.NEXTVAL, 'test1', '프로젝트 5', '다섯 번째 프로젝트 게시글입니다.', 'project_image5.jpg', 500, 25, 'Y', 'Y');

COMMIT;