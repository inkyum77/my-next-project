"use client";
import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Checkbox, FormControlLabel, List, ListItem, ListItemText, Collapse, Grid, FormControl, RadioGroup, Radio } from "@mui/material";
import { useRouter } from "next/navigation";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styles from "../Authentication.module.css";
import InputForm from "../../components/InputForm";
import useEmailVerification from "./hooks/useEmailVerification";
import useSignup from "./hooks/useSignUP";
import useBussinessNumberCheck from "./hooks/useBussinessNumberCheck";
import usePhoneVerification from "./hooks/usePhoneVerification";
import api from "../../../../services/axios";
import CommonForm from "../../components/CommonForm";
import AgreementForm from "../../components/AgreementForm";

function SignupPage() {

  return (
    <CommonForm
      agreement={true}
      type="회원가입"
    />
  );
}

export default SignupPage;