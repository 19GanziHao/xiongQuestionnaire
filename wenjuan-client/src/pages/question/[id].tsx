import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Question.module.scss";
import { getQuestionInfo } from "@/services/question";
import { genComponent } from "@/components/QuestionComponents";

type PropsType = {
  code: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished?: boolean;
    isDeleted?: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

export default function Question(props: PropsType) {
  const { code, data, msg } = props;

  const {
    id,
    title = "",
    isDeleted,
    desc = "",
    isPublished,
    componentList,
  } = data || {};

  // 请求失败
  if (code !== 1) {
    return (
      <PageWrapper title={title}>
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  // 问卷已删除
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已删除</p>
      </PageWrapper>
    );
  }

  // 该问卷尚未发布
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }
  const componentTitle: any = [];
  // 遍历获取的组件
  const componentListElem = (
    <>
      {componentList?.map((c) => {
        const ComponentElem = genComponent(c);
        const obj: Record<string, any> = {};
        obj.componentId = c.props.componentId
        obj.title = c.props.title;
        componentTitle.push(obj)
        return (
          <div key={c.id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title="问卷">
      <form action="/api/answer" method="post">
        <input type="hidden" name="questionId" defaultValue={id} />
        <input
          type="hidden"
          name="questionId"
          defaultValue={JSON.stringify(componentTitle)}
        />

        {componentListElem}
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const data = await getQuestionInfo(id);
  return {
    props: {
      ...data,
    },
  };
}
