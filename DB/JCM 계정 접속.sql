-- 한줄 주석
/*
    여러줄 주석
*/
SELECT * FROM DBA_USERS;    -- 현재 모든 계정들에 대하여 조회하는 명령문
-- 명령문 실행 : 초록색 재생버튼 클릭 또는 Ctrl + Enter

-- 일반 사용자 계정 생성 구문 (관리자 계정으로만 가능!)
-- [표현법] CREATE USER 계정명 IDENTIFIED BY 비밀번호;
CREATE USER "C##JCM" IDENTIFIED BY JCM;

-- 생성한 사용자 계정에 최소한 권한 (데이터 관리, 접속) 부여
-- [표현법] GRANT 권한1, 권한2, ... TO 계정명;
GRANT CONNECT, RESOURCE TO "C##JCM";

-- 테이블 스페이스 관련 설정
ALTER USER "C##JCM" DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;






