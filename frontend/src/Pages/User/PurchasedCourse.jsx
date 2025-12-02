import { useGetSinglePurchasedCourse } from '@/hooks/Course/course.hook'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useModuleStore } from '@/Store/module.store';
import { useCheckUserQuiz, useCreateQuizHook } from '@/hooks/Quiz/quiz.hook';
import { useCreateQuestion } from '@/hooks/Question/question.hook';
import { useForm } from 'react-hook-form';
import { useGetComment, usePostComment } from '@/hooks/Comment/comment.hook';
import { toast } from 'sonner';

const PurchasedCourse = () => {
  const navigate = useNavigate()
  const [loadingQuizId, setLoadingQuizId] = useState(null);
  const { register, handleSubmit } = useForm()
  const { module, setModule, clearModule } = useModuleStore();
 
  console.log(module)
  const [Video, setVideo] = useState("")
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSinglePurchasedCourse(id);

  const { mutate } = useCreateQuizHook()
  const { mutate: CreateQuestion , isPending} = useCreateQuestion()

  const { mutate: postComment } = usePostComment()
  const { data: commentData } = useGetComment(module?._id)

 
  const {data:checkQuiz}=  useCheckUserQuiz(module?._id)

  

const quizNavigatore = () => {

  // ✅ Safety check
 
 
  // console.log(module)
  navigate(`/quiz/${module.quiz}`)

  
  
  
  
  
  ;
};

  const moduleClickHandler = (moduleItem) => {
    setVideo(moduleItem.video);
    setModule(moduleItem);
  }

  const createCommentHandler = (data) => {
    if (!module?._id) {
      toast.error("Please select a module first");
      return;
    }

    console.log("Posting comment:", data.comment);
    console.log("Module ID:", module._id);

    postComment(
      {
        moduleId: module._id,
        comment: data.comment
      },
    );
  };

  const createQuizHandler = () => {
    mutate({
      moduleId: module._id,
      content: module.title
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-lg text-slate-600">Loading course...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-lg text-red-600">Failed to load course</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-100 px-4 py-6 gap-4">
      {/* LEFT */}
      <div className="left flex-1 max-w-[50%] flex flex-col gap-6">
        <h1 className='font-semibold cursor-pointer' onClick={()=>navigate(-1)}>Back</h1>
        {/* Video section */}
        <div className="bg-black rounded-xl overflow-hidden border border-slate-700 shadow-md">
          {module?.video ? (
            <video
              src={module.video}
              controls
              className="w-full aspect-video"
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-slate-300 text-lg">Please select a module</p>
            </div>
          )}
        </div>

        {/* Comments section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Comments
          </h1>

          {/* Comment form */}
          <form
            onSubmit={handleSubmit(createCommentHandler)}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              {...register("comment")}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </form>

          {/* Comments list */}
          <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
            {commentData?.comment?.length === 0 && (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}

            {commentData?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 mb-2">
                    <p className="text-gray-800 flex items-center justify-between">
                      {item.comment}
                      <span className="text-xs text-gray-600">
                        by {item.userId?.fullName || "Unknown"}
                      </span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right flex-1 max-w-[50%] min-h-screen flex flex-col items-center">
        <div className="min-h-fit w-[80%] space-y-4 pt-2">
          {data?.modules?.map((item, index) => {
            return (
              <Accordion
                onClick={() => moduleClickHandler(item)}
                key={index}
                type="single"
                collapsible
                className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50">
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{item.title}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {item.quizzes?.length || 0} quizzes
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 py-3 bg-gray-50 space-y-2">
                   {/* {item.quizzes.map((quiz, qId) => {
  return (
    <div key={qId}>
      <h1
        onClick={() => quizNavigatore(quiz)}
        className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline inline-block disabled:opacity-50"
      >
        {loadingQuizId === quiz ? 'Loading...' : `Join Quiz ${qId + 1}`}
      </h1>
    </div>
  );
})} */}   {
                      checkQuiz?.hasQuiz ? <>
                      <h1 onClick={quizNavigatore} >Go To Quiz</h1>
                      </> : <>
                      No Quiz Available
                      </>
}

                    <h1
                      className="cursor-pointer mt-3 inline-block text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
                      onClick={createQuizHandler}
                    >
                      {isPending ? 'Generating Quiz...' : 'Generate Quiz'}
                    </h1>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PurchasedCourse
