export function validateStep(step, data) {
  const errors = {};

  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = "Enter your full name.";
    if (!data.gender) errors.gender = "Select a gender.";
    if (!data.country) errors.country = "Select a country.";
    if (!data.city.trim()) errors.city = "Enter your city or state.";
    if (!data.region) errors.region = "Select a regional location.";
  }

  if (step === 1) {
    if (!data.isStudent) errors.isStudent = "Let us know if you're a student.";
    if (data.isStudent === "Yes" && !data.institution.trim()) {
      errors.institution = "Enter your institution.";
    }
    if (!data.hasExperience) errors.hasExperience = "Let us know about prior hackathon experience.";
    if (!data.finalAvailability) {
      errors.finalAvailability = "You must confirm availability for the final stage.";
    }
  }

  if (step === 2) {
    if (!data.projectName.trim()) errors.projectName = "Enter a project name.";
    if (!data.category) errors.category = "Select a project category.";
    if (!data.overview.trim()) errors.overview = "Describe your solution.";
    else if (data.overview.trim().length < 30) errors.overview = "Give a bit more detail (30+ characters).";
    if (!data.valueProposition.trim()) errors.valueProposition = "Tell us why it should be selected.";
    else if (data.valueProposition.trim().length < 20)
      errors.valueProposition = "Give a bit more detail (20+ characters).";
  }

  if (step === 3) {
    if (!data.hasTeam) errors.hasTeam = "Let us know if you have a team.";
    if (data.hasTeam === "Yes") {
      const size = Number(data.teamSize);
      if (!data.teamSize || Number.isNaN(size) || size < 2) {
        errors.teamSize = "Enter a team size of 2 or more.";
      } else if (size > 10) {
        errors.teamSize = "Team size can't exceed 10.";
      }
    }
  }

  if (step === 4) {
    if (!data.acceptedTerms) errors.acceptedTerms = "You must accept the terms and conditions to submit.";
  }

  return errors;
}

export const INITIAL_DATA = {
  fullName: "",
  gender: "",
  country: "",
  city: "",
  region: "",
  isStudent: "",
  institution: "",
  hasExperience: "",
  finalAvailability: false,
  projectName: "",
  category: "",
  overview: "",
  valueProposition: "",
  hasTeam: "",
  teamSize: "",
  acceptedTerms: false,
};
