package com.jocomi.jcm.board.model.vo;

import lombok.Data;


@Data
public class AnnouncementBoard {
    private int postNo;
    private String id;
    private String postTitle;
    private String postContent;
    private String imgFile;
    private String postTime;
    private int countView;
    private String status;
}
