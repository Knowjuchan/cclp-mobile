# CCLP 관리자 연결

현재 중앙 저장은 환경변수가 없으면 비활성화됩니다. 이 상태에서는 기존 브라우저 저장만 동작합니다.

1. Supabase 프로젝트를 생성합니다. 비용과 지역은 프로젝트 소유자가 선택합니다.
2. SQL Editor에서 `supabase/schema.sql`을 실행합니다.
3. Authentication > Providers에서 Google을 활성화합니다. Google Cloud OAuth 웹 클라이언트를 만들고, 승인된 리디렉션 URI에 Supabase가 표시한 `https://<project-ref>.supabase.co/auth/v1/callback`을 등록합니다. Google 클라이언트 비밀키는 Supabase 대시보드에 입력합니다.
4. Supabase URL Configuration의 Site URL은 `https://cclpretry2.vercel.app`, Redirect URLs는 `https://cclpretry2.vercel.app/auth/callback`을 등록합니다. 로컬 검증을 위해 `http://localhost:3102/auth/callback`도 등록할 수 있습니다. 필요 없는 Auth 공급자는 활성화하지 않습니다.
5. Vercel 프로젝트의 환경변수에 `.env.example`의 세 값을 설정합니다. publishable key는 공개용, service-role key는 서버 전용입니다. service-role key에 NEXT_PUBLIC 접두사를 붙이거나 GitHub에 올리지 마세요. 비밀키는 채팅으로 보내지 않고 서비스 설정 화면에 입력합니다.
6. 재배포 후 `/admin`에서 **shwncks15@gmail.com**의 Google 계정으로 로그인합니다. 다른 계정에서는 데이터 조회가 차단되는지 확인합니다.
7. 테스트 검사에서 중앙 저장 선택 동의 후 완료하고, 관리자 목록과 상세 결과에 표시되는지 확인합니다. SQL 정책도 별도 비관리자 계정으로 직접 조회해 차단되는지 확인합니다.

## 저장 항목과 삭제

선택 동의한 검사자의 이름, 180개 응답, 계산 결과, 엔진 버전, 동의 버전, 검사일을 저장합니다. 생일과 전화번호는 전송하지 않습니다. 결과 코드 원문은 저장하지 않고 SHA-256 해시를 저장합니다. 재시도는 같은 코드로 중복 저장되지 않습니다. 기존 브라우저 저장본은 자동 업로드하지 않습니다.

결과 코드는 여전히 같은 브라우저 조회용이며, 다른 기기 조회 기능은 추가하지 않았습니다. 중앙 저장은 관리자 읽기 전용 화면이며 삭제 요청은 개발자 이메일로 받습니다. 관리자는 Supabase 대시보드에서 요청된 행을 삭제할 수 있습니다. 실제 운영 전 보관기간과 삭제 담당 절차를 정하고 화면 안내에 반영하세요. 브라우저 저장본 삭제는 중앙 저장본 삭제와 별개입니다.

익명 제출 API의 Origin 확인은 권한 인증이나 봇 방어가 아닙니다. 공개 운영 전에 Vercel Firewall에서 `/api/results`의 POST 요청 속도 제한을 적용하고 저장 성공/실패를 확인하세요.

## 로고와 성경유형 이미지

원본 파일을 받은 뒤 `public/images`에 보관하고 `lib/assets.json`에 `/images/파일명`을 지정합니다. logo와 성경인물 9개 항목에 각 이미지 경로를 넣습니다. null 항목은 이미지 공간을 노출하지 않습니다. 유형 이미지가 글을 포함한 완성 결과지인지 인물 일러스트인지 확인한 뒤 배치 크기를 조정합니다.

## 검증

`node scripts/verify-engine.cjs`, `node scripts/verify-admin.cjs`, `npm run build`.
실제 Google OAuth/DB 저장은 위 설정이 완료된 환경에서 별도 검증해야 합니다.

## 수집 안내 변경
관리자 제출 선택 체크박스를 제거했습니다. 중앙 저장이 활성화되면 새 검사는 자동 제출됩니다. 첫 화면 하단에 항목·목적·삭제 문의를 안내합니다. 기존 consent_version 필드에는 collection-notice-v1을 저장하며 이는 명시적 동의 기록이 아니라 표시 안내 버전입니다. 과거 결과는 자동 전송하지 않습니다.

## 결과 알림 메일
Resend 계정을 생성하고 발신 도메인을 인증한 다음 RESEND_API_KEY, RESULT_EMAIL_FROM(인증된 발신 주소), APP_URL(실제 배포 URL)을 Vercel 서버 환경변수에 입력합니다. 수신 주소는 knowjuchan@sarang.org로 고정되어 있습니다. sarang.org 발신을 쓰려면 해당 도메인 DNS 관리자의 인증 작업이 필요합니다. 제어 가능한 다른 도메인의 발신 주소로 교회 메일에 수신해도 됩니다. API 키를 채팅이나 저장소에 넣지 마세요.

최신 schema.sql에는 email_status 컬럼이 있습니다. 기존 테이블에도 실행해야 합니다. 저장 성공 후 메일 서비스에 요약과 인증된 관리자 상세 링크를 전송합니다. 발송 실패가 결과 저장을 취소하지 않습니다. accepted는 서비스 접수 상태이며 실제 배달 성공은 Resend 로그에서 확인합니다. 자동 재시도 스케줄러는 아직 없고, 관리자 목록에서 메일 알림 다시 시도를 누르거나 동일 저장 요청을 재시도하면 미접수 메일을 재시도합니다. Resend 중복 방지 키를 사용합니다.

표본 CSV는 관리자 인증과 데이터베이스 조회 정책을 거쳐 생성합니다. 이름과 결과 조회 코드는 제외하고 임의 표본ID, 검사일, 엔진버전, 180개 응답, 모든 점수를 포함합니다. 관리자 원본과 ID로 연결 가능하므로 가명처리 자료이며 완전한 익명 자료는 아닙니다.

## 첫 연결 확인 순서
1. Supabase 가입 → 새 프로젝트 생성 → SQL Editor에서 schema.sql 실행
2. 프로젝트 URL, publishable key, service_role key를 Vercel 환경변수에 입력
3. Google OAuth와 Supabase Google 제공자를 SETUP의 로그인 절차대로 연결
4. Resend 가입 → 발신 도메인 인증 → API 키 생성 → 위 메일 환경변수 입력
5. 재배포 후 가상 검사자로 테스트 → 중앙 저장, 관리자 로그인, CSV, 수신 메일 확인
실제 응답자 모집 전에 저장·메일·인증 테스트를 완료합니다.

## 연결 중인 실제 프로젝트
프로젝트 ID: xcmxymjuaafayosegqzk
URL: https://xcmxymjuaafayosegqzk.supabase.co
지역: Tokyo (ap-northeast-1)
2026-10-03: assessment_results 생성 및 관리자 조회 정책 SQL 실행 성공. Google OAuth 연결 완료. Google 콜백: https://xcmxymjuaafayosegqzk.supabase.co/auth/v1/callback
Supabase Site URL: https://cclpretry2.vercel.app
허용된 로그인 복귀 URL: https://cclpretry2.vercel.app/auth/callback
Vercel ydg4/cclp_retry2 Production에 Supabase URL, publishable key, 서버용 secret key, APP_URL 등록 완료. 키 값은 문서에 기록하지 않습니다.
최신 코드를 Vercel CLI로 직접 배포 완료: dpl_53dHi669siMXbc4mYFtjeDSzDRLG. 실제 /admin에서 shwncks15@gmail.com Google 로그인 및 저장된 검사 0건 조회 확인.
2026-10-03: 실제 배포 API에 가상 180개 응답을 제출해 중앙 저장 성공 확인. '연결확인용 테스트 (실제 응답 아님)' 1건이 관리자 목록에 표시되며 3영역 상세 해설 조회 확인. CSV 다운로드: 데이터 1행, 205열, Q1–Q180 포함, 이름 열 없음. 테스트 UUID는 b7f3fec3-cfe8-4030-8b30-57ba3b6b7640이며 실제 표본 분석에서 제외해야 합니다.
Resend 계정·발신 도메인·메일 환경변수가 없어 실제 메일 전송은 아직 비활성화입니다.
이 배포는 로컬 소스를 직접 업로드한 것입니다. GitHub main에는 최신 소스 동기화가 아직 필요하며, 기존 main을 다시 배포하면 이전 코드로 돌아갈 수 있습니다.
