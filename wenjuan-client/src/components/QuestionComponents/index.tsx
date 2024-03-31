import QuestionInfo from "./QuestionInfo";
import QuestionRadio from "./QuestionRadio";
import QuestionTitle from "./QuestionTitle";
import QuestionInput from "./QuestionInput";
import QuestionTextarea from "./QuestionTextarea";
import QuestionCheckbox from "./QuestionCheckbox";
import QuestionParagraph from "./QuestionParagraph";
type ComponentInfoType = {
  id: string;
  type: string;
  isHidden: boolean;
  props: any;
};

export const genComponent = (comp: ComponentInfoType) => {
  const { id, type, isHidden, props } = comp;
  if (isHidden) return null;

  switch (type) {
    case "questionInput":
      return <QuestionInput fe_id={id} props={props} />;

    case "questionRadio":
      return <QuestionRadio fe_id={id} props={props} />;

    case "questionTitle":
      return <QuestionTitle fe_id={id} {...props} />;

    case "questionParagraph":
      return <QuestionParagraph {...props} />;

    case "questionInfo":
      return <QuestionInfo {...props} />;

    case 'questionTextarea':
      return <QuestionTextarea fe_id={id} props={props} />;
    
    case 'questionCheckbox': 
      return <QuestionCheckbox fe_id={id} props={props} />;
    default:
      return null;
  }
};
