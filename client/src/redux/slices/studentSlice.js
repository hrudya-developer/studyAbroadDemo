import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const initialState = {
  profile: {},
  profileRawData: null,
  profileLoading: false,
  profileError: "",

  qualificationUpdateLoading: false,
  qualificationUpdateError: "",
};

const normalizeStudentProfile = (result) => {
  const studentData = Array.isArray(result?.data)
    ? result.data[0]
    : result?.data || {};

  const rawQualification =
    result?.qualification ||
    result?.qualifications ||
    result?.education ||
    result?.educational_qualifications ||
    result?.educationalQualifications ||
    result?.student_qualification ||
    result?.studentQualification ||
    result?.qualification_data ||
    result?.qualificationData ||
    {};

  const qualificationData = Array.isArray(rawQualification)
    ? rawQualification[0] || {}
    : rawQualification || {};

  return {
    ...studentData,
    ...qualificationData,
  };
};

export const fetchStudentProfile = createAsyncThunk(
  "student/fetchStudentProfile",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getStudentProfile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api: API_KEY,
            uid,
          }),
        }
      );

      const result = await response.json();

      console.log("GET STUDENT PROFILE RESULT:", result);

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to fetch profile"
        );
      }

      return {
        profile: normalizeStudentProfile(result),
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch profile");
    }
  }
);

export const updateStudentQualifications = createAsyncThunk(
  "student/updateStudentQualifications",
  async ({ uid, form }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", String(uid));

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value || "").trim());
      });

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/updateQualifications",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(text || "Server returned invalid response.");
      }

      console.log("UPDATE QUALIFICATION RESULT:", result);

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to update qualifications"
        );
      }

      return {
        result,
        form,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update qualifications"
      );
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearStudentProfile: (state) => {
      state.profile = {};
      state.profileRawData = null;
      state.profileError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = "";
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload?.profile || {};
        state.profileRawData = action.payload?.raw || null;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload || "Failed to fetch profile";
      })

      .addCase(updateStudentQualifications.pending, (state) => {
        state.qualificationUpdateLoading = true;
        state.qualificationUpdateError = "";
      })
      .addCase(updateStudentQualifications.fulfilled, (state, action) => {
        state.qualificationUpdateLoading = false;

        // Temporary immediate UI update.
        // The final source should still be getStudentProfile after refetch.
        state.profile = {
          ...state.profile,
          ...(action.payload?.form || {}),
        };
      })
      .addCase(updateStudentQualifications.rejected, (state, action) => {
        state.qualificationUpdateLoading = false;
        state.qualificationUpdateError =
          action.payload || "Failed to update qualifications";
      });
  },
});

export const { clearStudentProfile } = studentSlice.actions;

export default studentSlice.reducer;