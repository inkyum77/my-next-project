"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";


const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("회원정보");


  // 메뉴 항목
  const menuItems = [
    "회원정보",
    "내가 찜한 캠핑장",
    "예약/이용 내역",
    "1:1문의",
    "내가 작성한 후기",
  ];

  // 렌더링할 컨텐츠
  const renderContent = () => {
    switch (selectedMenu) {
      case "회원정보":
        return <Typography>
        </Typography>;
      case "내가 찜한 캠핑장":
        return <Typography>찜한 캠핑장 목록이 표시됩니다.</Typography>;
      case "예약/이용 내역":
        return <Typography>예약 및 이용 내역이 표시됩니다.</Typography>;
      case "1:1문의":
        return <Typography>1:1문의 내용이 표시됩니다.</Typography>;
      case "내가 작성한 후기":
        return <Typography>내가 작성한 후기 목록이 표시됩니다.</Typography>;
      default:
        return <Typography>메뉴를 선택해주세요.</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 메뉴 */}


      {/* 오른쪽 메인 컨텐츠 */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          {selectedMenu}
        </Typography>
        <Box>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default MyPage;
