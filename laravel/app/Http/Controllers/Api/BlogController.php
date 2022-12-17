<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

use function PHPUnit\Framework\returnSelf;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogs = Blog::with('author')->get()->all();
        return response()->json(['blogs' => $blogs]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $authorId = Auth::id();
        if ($authorId === null) {
            return response()->json('error', 403);
        }

        try {
            $this->validate($request, [
                'title' => 'required|max:255',
                'body' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        }

        $blog = new Blog();
        $blog->author_id = $authorId;
        $blog->title = $request->title;
        $blog->body = $request->body;
        $blog->save();
        return response()->json(['blog' => $blog]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        return response()->json(['blog' => $blog->load('author')]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        $authorId = Auth::id();
        if ($authorId !== $blog->author_id) {
            return response()->json('error', 403);
        }

        try {
            $this->validate($request, [
                'title' => 'required|max:255',
                'body' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        }

        $blog->title = $request->title;
        $blog->body = $request->body;
        $blog->save();
        return response()->json(['blog' => $blog]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        $authorId = Auth::id();
        if ($authorId !== $blog->author_id) {
            return response()->json('error', 403);
        }

        $blog->delete();
        return response()->json('ok', 200);
    }
}
